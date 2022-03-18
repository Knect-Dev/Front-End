import axios from 'axios';

// Backend
const JOB_URL = 'https://knect-dev.herokuapp.com/Jobs/';

const initialState = {
  jobs: [
    // {
    //   id: '0',
    //   company: 'Microsoft',
    //   title: '500',
    //   jobId: '1234re',
    //   jobUrl: 'someurl.com',
    //   appliedDate: '03/16/2022',
    //   stage: 'Not Applied',
    //   status: true,
    //   openPositions: '10',
    //   location: 'Seattle, WA',
    //   technologies: 'JavaScript, .NET',
    //   targeted: '',
    //   offer: '',
    //   notes: 'Notes here!',
    // },
    // {
    //   id: '450',
    //   company: 'Amazon',
    //   title: 'burger flipper',
    //   jobId: '8098',
    //   appliedDate: '',
    //   stage: 'Applied',
    //   status: true,
    //   location: 'Seattle',
    //   technologies: 'Spatula, Grill',
    //   offer: '',
    //   notes: 'Low-stress'
    // },
    // {
    //   company: 'Boogie Woogie',
    //   title: 'Dancer',
    //   jobId: '',
    //   appliedDate: '',
    //   stage: 'tech Interview',
    //   status: false,
    //   location: 'Seattle',
    //   technologies: '',
    //   offer: '',
    //   notes: 'No compensation but great vibes'
    // },
    // {
    //   company: 'Charlie\'s Chocolates',
    //   title: 'Chocolatier',
    //   jobId: '',
    //   appliedDate: '',
    //   stage: 'Offer',
    //   status: false,
    //   location: '',
    //   technologies: '',
    //   offer: '',
    //   notes: ''
    // },
    // {
    //   company: 'Decks on Decks',
    //   title: 'Installer',
    //   jobId: '',
    //   appliedDate: '',
    //   stage: 'phone screen',
    //   status: true,
    //   location: '',
    //   technologies: '',
    //   offer: '',
    //   notes: ''
    // },
    // {
    //   company: 'Everyone Shops Here',
    //   title: 'Developer',
    //   jobId: '',
    //   appliedDate: '',
    //   stage: 'onsite',
    //   status: false,
    //   location: '',
    //   technologies: '',
    //   offer: '',
    //   notes: ''
    // },
    // {
    //   company: 'Faith, Hope, & Love',
    //   title: 'Software Developer',
    //   jobId: '',
    //   appliedDate: '',
    //   stage: 'onsite',
    //   status: false,
    //   location: '',
    //   technologies: '',
    //   offer: '',
    //   notes: ''
    // },
    // {
    //   id: '333',
    //   company: 'Golf Goobers',
    //   title: 'Caddy',
    //   jobId: '',
    //   appliedDate: '2/24/22',
    //   stage: 'Onsite',
    //   status: false,
    //   location: 'Atlanta',
    //   technologies: '',
    //   offer: 'lotsa money',
    //   notes: ''
    // },
    // {
    //   company: 'Hotel Hotel',
    //   title: 'Bartender',
    //   jobId: '',
    //   appliedDate: '3/22/22',
    //   stage: '',
    //   status: false,
    //   location: 'Seattle',
    //   technologies: '',
    //   offer: '',
    //   notes: ''
    // },
  ],
};

const jobReducer = (state = initialState, action) => {
  let { type, payload } = action;

  switch (type) {
    case 'ADD_JOB':
      if (payload.errors) return state;
      return { jobs: [...state.jobs, payload] };
    case 'UPDATE_JOB':
      //-- First we find the job we need to update, and make the changes --//
      let updatedJobId = state.jobs.indexOf(state.jobs.find(e => e.id === payload.id));
      let updatedJob = state.jobs.find(e => e.id === payload.id);
      updatedJob = payload;

      //-- Finally, we concat those two arrays together, resulting in our updated array --//
      state.jobs.splice(updatedJobId, 1, updatedJob);

      return { jobs: state.jobs };

    case 'REMOVE_JOB':
      let newArr = state.jobs.filter(job => job.id !== payload);

      return { jobs: newArr };

    case 'TEARDOWN_JOBS':

      return { jobs: [] };

    case 'SET_JOBS':
      //payload is my array of jobs
      return { ...state, jobs: [...state.jobs, ...payload] };

    default:
      return state;
  }
};

export const addJob = (job, token) => async (dispatch, getState) => {
  try {
    let response = await axios({
      url: JOB_URL,
      method: 'post',
      headers: { 'Authorization': token },
      data: job,
    });

    let added = response.data;
    dispatch({ type: 'ADD_JOB', payload: added });
  } catch (e) {
    console.log(e);
  }
}

export const updateJob = (job, token) => async (dispatch, getState) => {
  try {
    let response = await axios({
      url: `${JOB_URL}${job.id}`,
      method: 'put',
      headers: { 'Authorization': token },
      data: job,
    });

    let updated = response.data;
    dispatch({ type: 'UPDATE_JOB', payload: updated });
  } catch (e) {
    console.log(e);
  }
}

export const deleteJob = (id) => async (dispatch, getState) => {
  try {
    let response = await axios({
      url: `${JOB_URL}${id}`,
      method: 'delete',
      headers: { 'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3R1c2VyQHRlc3QuY29tIiwiaWF0IjoxNjQ3NDg4Njc0fQ.McFnceehlUQASOozJ7toBknPojl74cwsNrUTSEl7HD4' },
    });

    dispatch({ type: 'REMOVE_JOB', payload: id });
  } catch (e) {
    console.log(e);
  }
}

export const getJobs = (token) => async (dispatch) => {
  try {
    let response = await axios({
      url: JOB_URL,
      method: 'get',
      headers: { 'Authorization': token },
    });
    let data = response.data;
    dispatch({ type: 'SET_JOBS', payload: data });
  } catch (e) {
    console.log(e);
  }
};

export const tearDownJobs = (dispatch) => {
  dispatch({ type: 'TEARDOWN_JOBS' });
}

export default jobReducer;
