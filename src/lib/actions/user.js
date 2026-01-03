import { connectDB } from '../mongodb/mongoose';
import User from '../models/user.model';

/**
 * Create or Update User from Clerk data
 */
export const createOrUpdateUser = async (clerkUser) => {
  if (!clerkUser) {
    throw new Error('Clerk user data is required');
  }

  await connectDB();

  const userData = {
    clerkId: clerkUser.id,
    email: clerkUser.email_addresses?.[0]?.email_address,
    firstName: clerkUser.first_name || '',
    lastName: clerkUser.last_name || '',
    username: clerkUser.username || '',
    profilePicture: clerkUser.image_url || '',
  };

  const user = await User.findOneAndUpdate(
    { clerkId: clerkUser.id },
    { $set: userData },
    {
      new: true,       // return updated doc
      upsert: true,    // create if not exists
      setDefaultsOnInsert: true,
    }
  );

  return user;
};

export const deleteUser = async (clerkId) => {
  if (!clerkId) {
    throw new Error('clerkId is required to delete user');
  }

  await connectDB();

  const user = await User.findOneAndDelete({ clerkId });

  return user; // null if user not found
};