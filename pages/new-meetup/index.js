// our-domain.com/new-meetup
import { Fragment } from "react";
import Head from 'next/head';
import { useRouter } from "next/router";

import NewMeetupForm from "../../components/meetups/NewMeetupForm";

function NewMeetupPage() {
  const router = useRouter();

  async function addMeetupHandler(enteredMeetupData) {
    // Send request to that folder /api/new-meetup
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData), // JS object
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    console.log(data);

    // Make sure cant back with back button
    router.push("/");
  }

  return (
    <Fragment>
      <Head>
        <title>Add a New Meetup</title>
        <meta
          name='description'
          content='Add your own meetips and create amazing networking opportunities.'
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </Fragment>
  );
}

export default NewMeetupPage;
