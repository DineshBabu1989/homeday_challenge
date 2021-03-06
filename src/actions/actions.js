import axios from "axios";
export const GET_CONTRIBUTORS = "GET_CONTRIBUTORS";
export const GET_REPOS = "GET_REPOS";
export const GET_REPO_DETAIL = "GET_REPO_DETAIL";
export const SELECT_REPO = "SELECT_REPO";
export const USER_ERROR = "USER_ERROR";
export const REPO_ERROR = "REPO_ERROR";

/*Getting intial contributors list on app load
METHOD:GET,
URL:https://api.github.com/repos/angular/angular/contributors
*/
export const getContributors = () => dispatch => {
  axios
    .get("https://api.github.com/repos/angular/angular/contributors")
    .then(res => {
      //prepare data
      const users = res.data.map(user => {
        return {
          data: user.login,
          id: user.id
        };
      });
      dispatch({
        type: GET_CONTRIBUTORS,
        payload: users
      });
    })
    .catch(err => {
      console.log(err);
    });
};

/*Getting repo for selected user
METHOD:GET,
URL:https://api.github.com/users/${user}/repos
*/
export const getRepos = user => dispatch => {
  let reqUrl = `https://api.github.com/users/${user}/repos`;
  axios
    .get(reqUrl)
    .then(res => {
      //prepare data
      const repos = res.data.map(repo => {
        return {
          owner: repo.owner.login,
          data: repo.name,
          id: repo.id
        };
      });

      dispatch({
        type: GET_REPOS,
        payload: repos
      });
    })
    .catch(err => {
      console.log(err);
    });
};

/*Getting repo detail for a selected repo
METHOD:GET,
URL:https://api.github.com/repos/${user}/${reponame}/contributors
*/
export const getRepoDetails = repoDetails => dispatch => {
  let reqUrl = `https://api.github.com/repos/${repoDetails.ownerName}/${
    repoDetails.repoName
  }/contributors`;
  axios
    .get(reqUrl)
    .then(res => {
      //prepare data
      const repoDetail = res.data.map(repo => {
        return {
          name: repo.login,
          contribution: repo.contributions
        };
      });
      dispatch({
        type: GET_REPO_DETAIL,
        payload: repoDetail
      });
    })
    .catch(err => {
      console.log(err);
    });
};

/*Select repo*/
export const selectedRepo = repoName => dispatch => {
  dispatch({
    type: SELECT_REPO,
    payload: repoName
  });
};

/*User name error*/
export const userError = error => dispatch => {
  dispatch({
    type: USER_ERROR,
    payload: error
  });
};

/*Repo name error*/
export const repoError = error => dispatch => {
  dispatch({
    type: REPO_ERROR,
    payload: error
  });
};
