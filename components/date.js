import moment from "moment";

export default function Date({ dateString }) {
  const date = moment(dateString, "YYYY-MM-DD").format('LLLL');

  return <time>{date}</time>;
}