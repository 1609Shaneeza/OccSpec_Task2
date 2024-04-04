import { Card } from "react-bootstrap";


export interface MaterialcardProps {
    Title: string;
    Description: string;
    Habitation: string;
    Conservation: string;
    Url: string;
}

function EducationalMaterials({Title, Description, Habitation, Conservation, Url}:MaterialcardProps) {
    
    return (
      <>
        <Card className="menu px-1 py-1" style={{ width: "17rem" }}>
          <div className="image py-1">
            <Card.Img variant="top" src={Url} className="img-fluid" />
          </div>
          <Card.Body>
            <Card.Title>{Title}</Card.Title>

            <Card.Text>
              <p>{Description}</p>
              <p>Habitation: {Habitation}</p>
              <p>Conservation: {Conservation}</p>
            </Card.Text>
          </Card.Body>
        </Card>
      </>
    );
}

export default EducationalMaterials;