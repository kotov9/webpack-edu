import Post from '@models/Post';
import '@/styles/styles.css';
import './styles/less.less';
import './styles/scss.scss';
import * as $ from 'jquery';
// import json from './assets/json.json';
import WebpackLogo from './assets/image.png';
// import xml from './assets/xml.xml';
// import csv from './assets/csv.csv';
import './babel.js';
import React from 'react';
import {render} from 'react-dom';



const post = new Post("Webpack", WebpackLogo);
// console.log(json);
// console.log(xml);
// console.log(csv);
$('pre').html(post.toString());


const App = () => (
  <div className="container">
    <h1>Webpack Course</h1>
    <hr/>
    <div className="logo"></div>
    <hr/>
    <pre></pre>
    <hr/>
    <div className="box">
      <h2>Less</h2>
    </div>
    <hr/>
    <div className="card">
      <h2>Scss</h2>
    </div>
  </div>  
)

render(<App/>, document.getElementById('App'));