import * as $ from 'jquery';
import Post from '@models/Post';
import '@/styles/styles.css';
import json from './assets/json.json';
import WebpackLogo from './assets/image.png';
import xml from './assets/xml.xml';
import csv from './assets/csv.csv';

const post = new Post("Webpack", WebpackLogo);
// console.log(json);
// console.log(xml);
// console.log(csv);
$('pre').html(post.toString());