import axios from 'axios';

axios.get('http://lobid.org/gnd/search?q=london&format=json&size=5')
  .then((data: any) => {
    console.log(data);
  }).catch((error: any) => {
    console.log(error);
  });
