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

    const { Octokit } = await import("@octokit/rest");
    const octokit = new Octokit({
      auth: userData.access_token,
    });
    const orgsResponse = await octokit.request(`GET /user`, {
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });

    res.status(200).send(orgsResponse.data);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getOrgsData = async (req: any, res: any) => {
  const { username } = req?.params;
  const accessToken = req.headers.authorization?.split(" ")[1] as string;

  if (!accessToken) {
    return res.status(400).json({ error: "Access token is required." });
  }

  const { Octokit } = await import("@octokit/rest");

  try {
    const octokit = new Octokit({
      auth: accessToken,
    });

    const orgsResponse = await octokit.request(`GET /users/${username}/orgs`, {
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });

    const orgReposPromises = orgsResponse.data.map(async (org: any) => {
      try {
        const reposResponse = await octokit.request(
          `GET /users/${org.login}/repos`,
          {
            headers: {
              "X-GitHub-Api-Version": "2022-11-28",
            },
          }
        );
        return reposResponse.data;
      } catch (error) {
        console.error(`Error fetching repos for ${org.login}:`, error);
      }
    });

    const orgsWithRepos = await Promise.all(orgReposPromises);

    res.status(200).send(orgsWithRepos.flat());
  } catch (error) {
    console.error("Error fetching organizations:", error);
    res
      .status(400)
      .send({ error: "Failed to fetch organizations", details: error });
  }
};

export const getRepoDetail = async (req: any, res: any) => {
  const accessToken = req.headers.authorization?.split(" ")[1];
  const { slug } = req.body;

  if (!accessToken || !slug) {
    return res
      .status(400)
      .json({ error: "Access token and repository slug are required." });
  }

  const { Octokit } = await import("@octokit/rest");

  const octokit = new Octokit({
    auth: accessToken,
  });

  try {
    const [branches, pullRequests, issues] =
      await Promise.all([
        octokit.request(`GET /repos/${slug}/branches`, {
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
        }),
        octokit.request(`GET /repos/${slug}/pulls`, {
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
        }),
        octokit.request(`GET /repos/${slug}/issues`, {
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
        }),
      ]);

    const commitsData = branches.data.map(async (branch: any) => {
      try {
        const reposResponse = await octokit.request(
          `GET /repos/${slug}/commits?sha=${branch.name}`,
          {
            headers: {
              "X-GitHub-Api-Version": "2022-11-28",
            },
          }
        );
        return reposResponse.data;
      } catch (error) {
        console.error(`Error fetching repos for ${branch.name}:`, error);
      }
    });

    const pullRequestsData = pullRequests.data.filter((pr: any) =>
      pr.html_url.includes("/pull/")
    );
    const issuesData = issues.data.filter((issue: any) =>
      issue.html_url.includes("/issues/")
    );

    let userStats: any[] = [];
    const updateUserStats = (
      login: string,
      userId: number,
      type: "commits" | "pullRequests" | "issues"
    ) => {
      const existingUser = userStats.find(
        (userDetail) => userDetail.user === login
      );

      if (existingUser) {
        existingUser[type] += 1;
      } else {
        const newUserStats = {
          userId: userId,
          user: login,
          commits: type === "commits" ? 1 : 0,
          pullRequests: type === "pullRequests" ? 1 : 0,
          issues: type === "issues" ? 1 : 0,
        };
        userStats.push(newUserStats);
      }
    };

    const orgsWithRepos = await Promise.all(commitsData);
    orgsWithRepos.flat().forEach((commit) => {
      updateUserStats(commit.author.login, commit.author.id, "commits");
    });

    pullRequestsData.forEach((pull:any) => {
      updateUserStats(pull.user.login, pull.user.id, "pullRequests");
    });

    issuesData.forEach((issue: any) => {
      updateUserStats(issue.user.login, issue.user.id, "issues");
    });

    return res.status(200).json(userStats);
  } catch (error) {
    console.error("Error fetching repo details:", error);
    res.status(500).json({ error: error.message });
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
