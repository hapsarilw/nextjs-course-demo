import { Fragment } from "react";
import Head from 'next/head';
import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetUpDetail";

function MeetupDetails(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name='description' content={props.meetupData.description}/>
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
}

export async function getStaticPaths() {
  // fetch data from an API
  const client = await MongoClient.connect(
    "mongodb+srv://amihapsari:Amihapsari123@cluster0.wq6iu.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupCollection = db.collection("meetups");

  // Only fetch id, without other field
  const meetups = await meetupCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    // Your path supported parameter (t/f)
    // false -> user enter data(m3) -> 404 error
    // true -> generated page meetupID dynamically
    // pre generated for spesific meetup -> define path

    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  // fetch data for a single meetup

  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://amihapsari:Amihapsari123@cluster0.wq6iu.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupCollection = db.collection("meetups");

  // Only fetch id, without other field
  const selectedMeetup = await meetupCollection.findOne({
    _id: ObjectId(meetupId),
  });

  console.log(selectedMeetup);

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}

export default MeetupDetails;
