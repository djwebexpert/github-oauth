// Controller -
import axios from 'axios';
import GithubIntegration from '../models/User';

export const gitAuth = async (req: any, res: any) => {
  try {
    const { code } = req.query;
    const access = await axios({
      url: 'https://github.com/login/oauth/access_token',
      method: 'POST',
      headers: { accept: 'application/json' },
      params: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        redirect_uri: process.env.REDIRECT_URL,
        code,
      },
    });

    if (access.data && access.data.access_token) {
      const me = await axios({
        url: 'https://api.github.com/user',
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${access.data.access_token}`,
        },
      });

      if (me.data && me.data.id) {
        const user = new GithubIntegration({
          name: me.data.name,
          email: me.data.email,
          access_token: access.data.access_token,
          scope: access.data.scope,
        });

        const data = await user.save();

        res.status(201).send({ user: data });
        return;
      }
    }
    res.status(400).send({ user: false });
  } catch (error) {
    res.status(400).send({ error });
  }
};
