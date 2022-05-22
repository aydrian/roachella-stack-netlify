export default function Card({ details, canDelete = false }) {
  return (
    <div className="flex flex-col space-y-3 w-30 items-center justify-center space-around border-2 border-sky-200 rounded-lg p-4">
      <img src={details.avatar_url} alt="Github Avatar" className="rounded-full h-16 w-16 border-1 border-2 border-sky-500" />
      <p>
        {details.firstName} {details.lastName}
        <br />
        GitHub: {details.githubUsername}
        <br />
        Twitter: {details.twitter}
        <br />
        T-Shirt Size: {details.shirtSize}
      </p>
      {details.qrCode ? <img src={details.qrCode} alt="qr code" /> : null}
      {
        canDelete
          ? (
            <>
              <input type="hidden" name="_method" value="delete" />
              <button type="submit" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">Delete</button>
            </>
          )
          : null
      }
    </div>
  )
}