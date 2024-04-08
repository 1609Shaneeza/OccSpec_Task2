import { Card } from "react-bootstrap";


export interface MaterialcardProps {
    Title: string;
    Description: string;
    Habitat: string;
    Conservation: string;
    Url: string;
}

function EducationalMaterials({Title, Description, Habitat, Conservation, Url}:MaterialcardProps) {
    
    return (
      <>
        <Card className="menu px-1 py-1 mx-3 my-3" style={{ width: "17rem" }}>
          <div className="image py-1">
            <Card.Img
              variant="top"
              src={Url}
              className="img-fluid"
              width="400"
              height="300"
            />
          </div>
          <Card.Body>
            <Card.Title>{Title}</Card.Title>

            <Card.Text>
              <p>{Description}</p>
              <p>Habitation: {Habitat}</p>
              <p>Conservation: {Conservation}</p>
            </Card.Text>
          </Card.Body>
        </Card>
      </>
    );
}

export default EducationalMaterials;