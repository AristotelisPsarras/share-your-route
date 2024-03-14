// import './style.css';
// // import React, { useState } from 'react';
// import React from 'react';
// import { useEffect, useState } from 'react';

// import supabase from './supabase';
import React, { useState, useEffect } from 'react';
import supabase from './supabase';

import './style.css';
//Τα αρχεια γιατι δεν εκανα import 


const initialRoutes = [
  {
    id: 1,
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    source: "https://maps.google.com/",
    category: "on-bellow-400km",
    votesInteresting: 24,
    votesMindblowing: 9,
    votesFalse: 4,
    createdIn: 2021,
  },
  {
    id: 2,
    text: " Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    source:
      "https://maps.google.com/",
    category: "on-above-400km",
    votesInteresting: 11,
    votesMindblowing: 2,
    votesFalse: 0,
    createdIn: 2019,
  },
  {
    id: 3,
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    source: "https://maps.google.com/",
    category: "enduro-easy",
    votesInteresting: 8,
    votesMindblowing: 3,
    votesFalse: 1,
    createdIn: 2015,
  },
];

function App() {
  const [showForm, setShowForm] = useState(false);
  const [routes, setRoutes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("all");
  useEffect(function () {
    async function getRoutes() {
      setIsLoading(true);

      let query = supabase.from('routes')
        .select("*");
      if (currentCategory !== "all") {
        query = query.eq("category", currentCategory);
      }

      const { data: routes, error } = await query
        // .from('routes')
        // .select("*").eq("category", "enduro-easy")
        .order('votesintresting', { ascending: false }).limit(1000);
      if (!error) {
        setRoutes(routes);
      }
      // console.log(error);
      setIsLoading(false);
    }
    getRoutes();
  }, [currentCategory]);
  return (
    <>
      <Header showForm={showForm} setShowForm={setShowForm} />
      {showForm ? <NewRouteForm setRoutes={setRoutes} setShowForm={setShowForm} /> : null}
      <main className="main">
        <CategoriesAside setCurrentCategory={setCurrentCategory} />
        {isLoading ? <Loader /> : <RouteList routes={routes} setRoutes={setRoutes} />}
      </main>
    </>
  );

}
function Loader() {
  return <p className='message'>loading...</p>
}
function Header({ showForm, setShowForm }) {
  return (
    <header className="header">
      <div className="logo">
        <img src="logo.png" />
        <h1> Share Your Route</h1>
      </div>
      <button className="btn btn-large btn-open" onClick={() => setShowForm((show) => !showForm)}>
        {showForm ? "close" : "share your route"}
      </button>
    </header>
  );
}
const CATEGORIES = [
  { name: "on-bellow-400km", color: "#3b82f6" },
  { name: "on-above-400km", color: "#16a34a" },
  { name: "enduro-easy", color: "#ef4444" },
  { name: "enduro-medium", color: "#eab308" },
  { name: "enduro-hard", color: "#db2777" },
  { name: "on-off-easy", color: "#14b8a6" },
  { name: "on-off-medium", color: "#f97316" },
  { name: "on-off-hard", color: "#8b5cf6" },
];
function CategoriesAside({ setCurrentCategory }) {
  return (
    <aside >
      <ul>
        <li className="category"><button className="btn btn-all-categories" onClick={() => setCurrentCategory("all")}>All</button></li>
        {CATEGORIES.map((category) => (
          <li key={category.name} className="category"> <button className="btn btn-category"
            style={{ backgroundColor: category.color }} onClick={() => setCurrentCategory(category.name)}>{category.name}</button>
          </li>))}
      </ul>
    </aside >

  );
}
function NewRouteForm({ setRoutes, setShowForm }) {
  const [text, setText] = useState("");
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const textLength = text.length;
  //check if the url of the source is valid 
  function isValidUrl(source) {
    let url;
    try {
      url = new URL(source);
    } catch (_) {
      return false;
    }
    return url.protocol === "https:" || url.protocol === "http:";
  }
  async function handleSubmit(e) {
    //1 Prevent the date from reloading
    e.preventDefault();
    //2.Check if the data is valid
    if (text && isValidUrl(source) && category && textLength <= 200) {
      //3. Create a new route object(in comments ) now i upload the new route to the supabase 
      setIsUploading(true);
      const { data: newRoute, error } = await supabase.from('routes').insert([{ text, source, category }]).select();
      setIsUploading(false);
      // console.log(newRoute);
      // const newRoute = {
      //   id: Math.round(Math.random() * 100000000000),
      //   text: text,
      //   source: source,
      //   category: category,
      //   votesInteresting: 0,
      //   votesMindblowing: 0,
      //   votesFalse: 0,
      //   createdIn: new Date().getFullYear(),
      // };
      // routes.push(newRoute);
      // setText("");
      // setSource("");
      // setCategory("");
      //4. Add the new route to the UI and route to the state
      // if (!error) setRoutes((routes) => [newRoute[0], ...routes]);
      //5. Reset the input fields
      setText("");
      setSource("");
      setCategory("");
      //6. close the form 
      setShowForm(false);
    }
  }

  return (
    <form className="route-form " onSubmit={handleSubmit}>
      {/* //changing the input value */}
      <input type="text" name="" id="" placeholder="Share your route" value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <span>{200 - text.length}</span>
      <input type="text" name="" id="" disabled={isUploading} value={source} placeholder="https://example.com" onChange={(e) => setSource(e.target.value)} />
      <select disabled={isUploading} name="" id="" value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Choose a category</option>
        {CATEGORIES.map((category) => <option key={category.name} value={category.name} >{category.name.toUpperCase()}</option>)}
      </select>
      <button className="btn btn-large" disabled={isUploading}>Post </button>
    </form>
  );

}
function RouteList({ routes, setRoutes }) {
  if (routes.length === 0) {
    return <p className="message">No routes for this category yet Create the first one </p>

  }
  return (
    //Reading facts from the array initialRoutes array
    <section > <ul className="routes-list">{
      routes.map((routes) => (<Route key={
        routes.id
      } routes={routes} setRoutes={setRoutes} />

      ))
    }</ul>
      <p>There are {routes.length} different routes , chosse one of them and have fun  </p></section >
  );
}
function Route({ routes, setRoutes }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const isDispuded = routes.votesintresting + routes.votesmindblowing < routes.votesfalse;

  async function handleVote(columnName) {
    setIsUpdating(true);
    const { data: updatedRoute, error } = await
      supabase
        .from('routes')
        .update({ [columnName]: routes[columnName] + 1 })
        .eq("id", routes.id)
        .select();
    setIsUpdating(false);

    // console.log(updatedRoute);
    if (!error)
      setRoutes((routes) =>
        routes.map((r) => (r.id === routes.id ? updatedRoute[0] : r))
      );

  }
  return (<li className="route">
    {isDispuded ? <span className='disputed'>[disputed]</span> : null}
    <p>{routes.text}<a className="map" href={routes.source} target="_blank">Route</a>
    </p >
    <span className="tag" style={{ backgroundColor: CATEGORIES.find((cat) => cat.name === routes.category).color }}>
      {routes.category}
    </span>
    <div className="vote-buttons">
      <button onClick={() => handleVote("votesintresting")} disabled={isUpdating}>👍 {routes.votesintresting} </button>
      <button onClick={() => handleVote("votesmindblowing")} disabled={isUpdating}>🤯 {routes.votesmindblowing} </button>
      <button onClick={() => handleVote("votesfalse")} disabled={isUpdating} >⛔️ {routes.votesfalse} </button>
    </div>
  </li >);
}
export default App;

