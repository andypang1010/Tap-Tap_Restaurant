export default function Unauthorized() {
  return (
    <div className="unauthorized">
      <i className="bx bx-block no-access-icon"></i>
      <p className="unauthorized-text">
        You do not have the proper permissions to view this content.
      </p>
      <p className="contact-system-administrator">
        Please contact your manager or system administrator if you believe this
        to be a mistake.
      </p>
    </div>
  );
}
