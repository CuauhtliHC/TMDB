import db from '../../../utils/db';

export default async (req, res) => {
  try {
    const entries = await db.listUsers();
    res.status(200).json(entries);
  } catch (e) {
    res.status(400).end();
  }
}