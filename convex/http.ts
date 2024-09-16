import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";
import type { WebhookEvent } from "@clerk/nextjs/server";
import { Webhook } from "svix";


const handleClerkWebhook = httpAction(async (ctx, request) => {
  const event = await validateRequest(request);
  if (!event) {
    return new Response("Error occured", {
      status: 400,
    });
  }
  switch (event.type) {
    case "user.created":
        await ctx.runMutation(internal.users.createUser, {
            clerkId: event.data.id,
            email: event.data.email_addresses[0].email_address,
            imageUrl: event.data.image_url,
            name: event.data.first_name!,
        })

    /* case "user.updated": {
      const existingUser = await ctx.runQuery(internal.users.getUser, {
        subject: event.data.id,
      });
      if (existingUser && event.type === "user.created") {
        console.warn("Overwriting user", event.data.id, "with", event.data);
      }
      console.log("creating/updating user", event.data.id);
      await ctx.runMutation(internal.users.updateOrCreateUser, {
        clerkUser: event.data,
      });
      break;
    }
    case "user.deleted": {
      // Clerk docs say this is required, but the types say optional?
      const id = event.data.id!;
      await ctx.runMutation(internal.users.deleteUser, { id });
      break;
    } */
    
  }
  return new Response(null, {
    status: 200,
  });
});

const http = httpRouter();

http.route({
  path: "/clerk",
  method: "POST",
  handler: handleClerkWebhook,
});

const validateRequest = async (
  req: Request
): Promise<WebhookEvent | undefined> => {
  // key note : add the webhook secret variable to the environment variables field in convex dashboard setting
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET!;
  if (!webhookSecret) {
    throw new Error("CLERK_WEBHOOK_SECRET is not defined");
  }
  const payloadString = await req.text();
  const headerPayload = req.headers;
  const svixHeaders = {
    "svix-id": headerPayload.get("svix-id")!,
    "svix-timestamp": headerPayload.get("svix-timestamp")!,
    "svix-signature": headerPayload.get("svix-signature")!,
  };
  const wh = new Webhook(webhookSecret);
  const event = wh.verify(payloadString, svixHeaders);
  return event as unknown as WebhookEvent;
};

export default http;
