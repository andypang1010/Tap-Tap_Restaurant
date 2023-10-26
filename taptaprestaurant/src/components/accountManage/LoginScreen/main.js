import Button from '@mui/material/Button';

export default main;
function main() {
    return (
        <div className="loginScreen-container"
            style={{
                display: 'flex',
                justifyContent: 'center',  // Horizontally center
                alignItems: 'center',      // Vertically center
                height: '100vh',            // This assumes you want to center in the entire viewport height
                flexDirection: 'column'
            }}
        >
            <img alt =""
                src="/logo.svg"
                style={{
                }}
            />
            <div style={{
                width: '390px',
                height: '373px',
                justifyContent: 'flex-start',  // Horizontally center
                alignItems: 'center',      // Vertically center
                borderRadius: '8px',
                padding: '24px 16px 24px 16px',  // Top, Right, Bottom, Left
                gap: '24px',                     // Assumes flex or grid layout, otherwise won't have any effect
                // Optional: if you want content to be laid out as flex/grid items
                display: 'flex',
                flexDirection: 'column'  // Sample layout. Adjust as needed
            }}>

                <p
                    href="#" // replace with your desired link
                    style={{
                        fontFamily: 'SF Pro',
                        fontWeight: 700,
                        fontSize: '24px',
                        lineHeight: '28.64px',
                        letterSpacing: '-1%',
                        textAlign: 'center',
                        display: 'block'  // This ensures that the textAlign property affects the content
                    }}
                >
                    Restaurant's best friends
                </p>

                <div style={{width:"358px", gap:"8px"}}>
                    <Button href="/SignUp/email" style={{width:"358px",height:"48px",textTransform: 'none', backgroundColor:"#D41E1E"}} variant="contained">
                        <p
                        href="#" // replace with your desired link
                            style={{
                                fontFamily: 'SF Pro',
                                fontWeight: 700,
                                fontSize: '16px',
                                lineHeight: '19.09px',
                                letterSpacing: '1px',
                                textAlign: 'center',
                                display: 'block'  // This ensures that the textAlign property affects the content
                        }}>Sign up</p>
                    </Button>

                    <Button style={{width:"358px",height:"48px",textTransform: 'none', color:"#D41E1E", marginTop:"8px"}} variant="text">
                        <p
                        href="#" // replace with your desired link
                            style={{
                                fontFamily: 'SF Pro',
                                fontWeight: 700,
                                fontSize: '16px',
                                lineHeight: '19.09px',
                                letterSpacing: '1px',
                                textAlign: 'center',
                                display: 'block'  // This ensures that the textAlign property affects the content
                        }}>Log in</p>
                    </Button>
                </div>
            </div>

        </div>
    )
  }
