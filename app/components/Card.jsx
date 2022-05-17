export default function Card({ person }) {

  console.log({ person })

  return (
    <div className="flex flex-col space-y-3 w-30 items-center justify-center space-around border-2 border-sky-200 rounded-lg p-4">
      <img src={person.avatar_url} alt="Github Avatar" className="rounded-full h-16 w-16 border-1 border-2 border-sky-500" />
      <p>
        {person.firstName} {person.lastName}
        <br />
        GitHub: {person.githubUsername}
        <br />
        Twitter: {person.twitter}
        <br />
        T-Shirt Size: {person.shirtSize}
      </p>
      <img src={person.qrCode} alt="qr code" />
    </div>
  )
}