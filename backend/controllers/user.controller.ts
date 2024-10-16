// Controller - User
import GithubIntegration from "../models/User";

export const getUser = async (req: any, res: any) => {
  const { id } = req?.params;
  try {
    const userData = await GithubIntegration.findOne({ _id: id });

    if (!userData) {
      res.status(400).send({ error: "user not found" });
      return;
    }

    res.status(200).send(userData);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const deleteUser = async (req: any, res: any) => {
  const { id } = req?.params;

  try {
    const userData = await GithubIntegration.findOne({ _id: id });

    if (!userData) {
      res.status(400).send({ error: "user not found" });
      return;
    }

    const userDelete = await GithubIntegration.deleteOne({ _id: id });
    res.status(200).send({ userDelete: !!userDelete });
  } catch (error) {
    res.status(400).send(error);
  }
};
