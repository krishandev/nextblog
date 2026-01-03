import { verifyWebhook } from '@clerk/nextjs/webhooks';
import { createOrUpdateUser, deleteUser } from '../../../lib/actions/user';

export async function POST(req) {
  try {
    // Verify webhook signature
    const evt = await verifyWebhook(req);

    const eventType = evt?.type;
    const data = evt?.data;

    console.log(`✅ Clerk Webhook: ${eventType}`);
    console.log('Payload:', data);

    // USER CREATED
    if (eventType === 'user.created') {
      await createOrUpdateUser(data);
      console.log('🟢 User created:', data.id);
    }

    // USER UPDATED
    if (eventType === 'user.updated') {
      await createOrUpdateUser(data);
      console.log('🟡 User updated:', data.id);
    }

    // USER DELETED
    if (eventType === 'user.deleted') {
      await deleteUser(data.id);
      console.log('🔴 User deleted:', data.id);
    }

    return new Response('Webhook received', { status: 200 });
  } catch (error) {
    console.error('❌ Webhook verification failed:', error);
    return new Response('Webhook error', { status: 400 });
  }
}
