import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";

const teamMembers = [
  {
    name: "Huyu Chen",
    email: "huyuchen@seas.upenn.edu",
    introduction:
      "Huyu specializes in front-end development and loves creating seamless user experiences.",
  },
  {
    name: "Zhiyao Jia",
    email: "messonj@seas.upenn.edu",
    introduction:
      "Zhiyao focuses on back-end engineering and enjoys solving complex problems.",
  },
  {
    name: "Chaoyang Shen",
    email: "shec@seas.upenn.edu",
    introduction:
      "Chaoyang is passionate about full-stack development and API integration, she developed the front end and API integration for Sweat and Syntax.",
  },
  {
    name: "Yiqun Tian",
    email: "tianyq@seas.upenn.edu",
    introduction:
      "Yiqun is skilled in database design and data-driven solutions, he developed the database and backend solutions for Sweat and Syntax.",
  },
];

export default function AboutUs() {
  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">About Us</h2>
      <h4 className="text-center mb-5">Team Name: Sweat and Syntax</h4>
      <Row xs={1} md={2} lg={2} className="g-4">
        {teamMembers.map((member, index) => (
          <Col key={index}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <div className="text-center mb-3">
                  <FontAwesomeIcon icon={faUserCircle} size="3x" />
                </div>
                <Card.Title className="text-center">{member.name}</Card.Title>
                <Card.Text>{member.introduction}</Card.Text>
                <Card.Text>
                  <FontAwesomeIcon icon={faEnvelope} />{" "}
                  <a href={`mailto:${member.email}`}>{member.email}</a>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
