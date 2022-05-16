export default function Card({ person }) {
  return (
    <div className="flex w-30 space-around border-2 border-sky-200 rounded-lg p-4">
      <div>
        <p>
          {person.firstName} {person.lastName}
          <br />
          GitHub: {person.githubUsername}
          <br />
          Twitter: {person.twitter}
          <br />
          T-Shirt Size: {person.shirtSize}
        </p>
      </div>

      <img className=" w-20 h-20" src={person.qrCode} alt="qr code" />
    </div>
  )
}