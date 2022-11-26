import moment from "moment";

export default function Date({ dateString }) {
  const date = moment(dateString, "YYYY-MM-DD").format('LL');

  return <time>{date}</time>;
}