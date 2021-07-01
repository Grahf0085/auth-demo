import pool from '../utils/pool.js';

export default class Comment {

  id;
  comment;
  commentBy;
  post;

  constructor(row) {

    this.id = row.id;
    this.comment = row.comment;
    this.commentBy = row.comment_by;
    this.post = row.post;

  }

  static async insert({ comment, commentBy, post }) {

    const { rows } = await pool.query(
      'INSERT INTO comments (comment_by, post, comment) VALUES ($1, $2, $3) RETURNING *',
      [commentBy, post, comment]
    );

    return new Comment(rows[0]);
  }

  static async delete(id) {

    const { rows } = await pool.query(
      'DELETE FROM comments WHERE id = $1 RETURNING *',
      [id]
    );

    return new Comment(rows[0]);
  }

}
