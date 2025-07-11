import React, { useState } from 'react';
import Header from '../components/Header';
import AddExpenseForm from '../components/AddExpenseForm';
import Footer from '../components/Footer';
import UserTable from '../components/UserTable';
import HandleImage from '../components/HandleImage';
import LikeButton from '../components/LikeButton';
import Jokes from '../components/Jokes';
import JokeForm from '../components/JokeForm';
import Timer from '../components/Timer';

const Dashboard = () => {
  const [jokes, setJokes] = useState([
    {
      id: 1,
      text: "Why don't scientists trust atoms? Because they make up everything!"
    },
    {
      id: 2,
      text: "Why did the scarecrow win an award? Because he was outstanding in his field!"
    },
    {
      id: 3,
      text: "What do you call fake spaghetti? An impasta!"
    }
  ]);

  const handleNewJoke = ({ text }) => {
    console.log("New Joke Submitted:", text);
    const newJoke = { id: jokes.length + 1, text };
    setJokes([...jokes, newJoke]); // Add new joke to state
  };

  return (
    <>
      <Header />
      <AddExpenseForm />
      <UserTable />
      {jokes.map((joke) => (
        <Jokes key={joke.id} id={joke.id} text={joke.text} />
      ))}
      <HandleImage />
      <JokeForm onNewJoke={handleNewJoke} />
      <LikeButton />
      {/* <Footer /> */}
    </>
  );
};

export default Dashboard;
