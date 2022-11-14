import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { GetUsers } from '../interface/getUsers.interface';
import { Octokit } from 'octokit';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  async getUsers(params: GetUsers) {
    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN,
    });

    try {
      const result = await octokit.request(
        `GET /users?since=${params.since}&per_page=${params.perPage}`,
        {},
      );

      if (result.data.length < 1) {
        console.log('Not have data result.');
      }

      return result;
    } catch (error) {
      console.log(
        `Error! Status: ${error.status}. Message: ${error.response.data.message}`,
      );
    }
  }

  async getUsernameDetail(username: string) {
    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN,
    });

    try {
      const result = await octokit.request(`GET /users/${username}`, {
        username: username,
      });

      if (result.data.length < 1) {
        console.log('Not have data result.');
      }

      return result;
    } catch (error) {
      console.log(
        `Error! Status: ${error.status}. Message: ${error.response.data.message}`,
      );
    }
  }

  async getUserRepository(username: string) {
    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN,
    });

    try {
      const result = await octokit.request(`GET /users/${username}/repos`, {
        username: username,
      });

      if (result.data.length < 1) {
        console.log('Not have data result.');
      }

      return result;
    } catch (error) {
      console.log(
        `Error! Status: ${error.status}. Message: ${error.response.data.message}`,
      );
    }
  }
}
