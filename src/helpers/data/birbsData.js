import axios from 'axios';

import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getBirbsByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/birbs.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      const allBirbs = response.data;
      const myBirbs = [];

      if (allBirbs) {
        Object.keys(allBirbs).forEach((birbId) => {
          const birb = allBirbs[birbId];
          birb.id = birbId;
          myBirbs.push(birb);
        });
      }

      resolve(myBirbs);
    })
    .catch((err) => reject(err));
});

const getBirbById = (birbId) => axios.get(`${baseUrl}/birbs/${birbId}.json`);

const createBirb = (newBirb) => axios.post(`${baseUrl}/birbs.json`, newBirb);

const updateBirb = (birbId, updatedBirb) => axios.patch(`${baseUrl}/birbs/${birbId}.json`, updatedBirb);

const deleteBirb = (birbId) => axios.delete(`${baseUrl}/birbs/${birbId}.json`);

export default { getBirbsByUid, getBirbById, createBirb, deleteBirb, updateBirb };
