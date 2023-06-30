import Prompt from "@models/prompt";
import User from "@models/user";
import { connectToDB } from "@utils/database";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const user = await User.findOne({
      _id: params.id,
    });
    const posts = await Prompt.find({
      creator: params.id,
    }).populate("creator");
    return new Response(JSON.stringify({ posts, user }), {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
