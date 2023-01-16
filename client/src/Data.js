import { Buffer } from "buffer";
export default class Data {
  api(
    path,
    method = "GET",
    body = null,
    requiresAuth = false,
    credentials = null
  ) {
    const url = `fullstackapp-production-2547.up.railway.app${path}`;

    const options = {
      method,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    };

    // Check if auth is required

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    // if true the user credentials will be encoded & set HTTP auth request
    if (requiresAuth) {
      const encodedCredentials = Buffer.from(
        `${credentials.username}:${credentials.password}`
      ).toString("base64");
      options.headers["Authorization"] = `Basic ${encodedCredentials}`;
    }
    return fetch(url, options);
  }

  async getUser(username, password) {
    const response = await this.api(`/users`, "GET", null, true, {
      username,
      password,
    });
    if (response.status === 200) {
      return response.json().then((data) => data);
    } else if (response.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  }

  async createUser(user) {
    const response = await this.api("/users", "POST", user);
    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }

  async getCourses() {
    const response = await this.api(`/courses`, "GET");
    if (response.status === 200) {
      return response.json().then((data) => data);
    } else {
      throw new Error();
    }
  }

  async getCourse(id) {
    const response = await this.api(`/courses/${id}`, "GET");
    if (response.status === 200) {
      return response.json().then((data) => data);
    } else {
      throw new Error();
    }
  }

  async createCourse(body, username, password) {
    const response = await this.api("/courses", "POST", body, true, {
      username,
      password,
    });
    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }

  async updateCourse(id, body, username, password) {
    const response = await this.api(`/courses/${id}`, "PUT", body, true, {
      username,
      password,
    });
    if (response.status === 204) {
      return [];
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }

  async deleteCourse(id, username, password) {
    const response = await this.api(`/courses/${id}`, "DELETE", null, true, {
      username,
      password,
    });
    if (response.status === 204) {
      return [];
    } else if (response.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  }
}
