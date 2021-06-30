import pool from '../utils/pool.js';

export default class Post {
  id;
  userId;
  photoUrl;
  caption;
  tags;

  constructor(row) {

    this.id = row.id;
    this.userId = row.user_id;
    this.photoURL = row.photo_url;
    this.caption = row.caption;
    this.tags = row.tags;

  }

  static async insert({ userId, photoURL, caption, tags }) {
    console.log(userId, photoURL, caption, tags);
    const { rows } = await pool.query(
      'INSERT INTO posts (user_id, photo_url, caption, tags) VALUES ($1, $2, $3, $4) RETURNING *',
      [userId, photoURL, caption, tags]
    );
    
    return new Post(rows[0]);
  }
}
