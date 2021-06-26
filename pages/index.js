import Head from 'next/head';
import { Fragment } from 'react';
import { MongoClient } from 'mongodb';

import MeetUpList from '../components/meetups/MeetupList';

function HomePage(props) {
  return(
  <Fragment>
    <Head>
      <title>React Meetups</title>
      <meta
        name='description'
        content='Browse a huge liat of highly active React meetups'
      />
    </Head>
    <MeetUpList meetups={props.meetups} />;
  </Fragment>);
}

// Only run in the server-side never in client
// export async function getServerSideProps(context){
//   const req = context.req;
//   const res = context.res;

//   // fetch data from an API

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   };
// }

// Called before it calls the component function
// Allowed to be Asynchronous

export async function getStaticProps() {
  // Code that normally run on a server : file system & database
  // fetch data from an API
  const client = await MongoClient.connect(
    "mongodb+srv://amihapsari:Amihapsari123@cluster0.wq6iu.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupCollection = db.collection("meetups");

  const meetups = await meetupCollection.find().toArray();

  return {
    props: {
      // map() -> data need to tranform because of ID not in string type
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    // Pages generated every couple of second -> depend on data changed
    revalidate: 1,
  };
}

export default HomePage;
