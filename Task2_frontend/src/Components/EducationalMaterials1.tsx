import axios from "axios";
import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import EducationalMaterials, { MaterialcardProps } from "./EducationalVisit";


function EducationMaterials1() {
    const [materials, setMaterials] = useState([]);

    useEffect(() => {
      document.title = "PreOrders";
    }, []);

    useEffect(() => {
      const getMaterials = async () => {
        try {
          const response = await axios.get(
            "http://localhost:5000/EducationalMaterials"
          );
          setMaterials(response?.data?.result);
        } catch (error) {
          console.error("Error fetching pre-orders:", error);
        }
      };

      getMaterials();
    }, []);


    return (
      <>
        <h1 className="text-center">Educational Materials </h1>
        <div className="container text-center">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-1">
            <div className="col">
              <Row fluid>
                {materials.map((EducationalMaterial: MaterialcardProps) => (
                  <EducationalMaterials
                        key={EducationalMaterial.Title}
                        Title={EducationalMaterial.Title}
                        Description={EducationalMaterial.Description}
                        Url={EducationalMaterial.Url}
                        Habitat={EducationalMaterial.Habitat} 
                        Conservation={EducationalMaterial.Conservation}                  
                        />
                ))}
              </Row>
            </div>
          </div>
        </div>
      </>
    );
}

export default EducationMaterials1;