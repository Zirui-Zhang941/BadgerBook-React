import { Button, Container, Form, Row ,Col } from "react-bootstrap";
import { useEffect, useState } from "react"
import Student from "./Student";
import Pagination from 'react-bootstrap/Pagination';

const Classroom = () => {

    const [studentdata, setStudentData] = useState([]);
    const [nameSearch, setNameSearch] = useState("");
    const [majorSearch, setMajorSearch] = useState("");
    const [interestSearch, setInterestSearch] = useState("");
    const [shownStudents, setShownStudents] = useState([]);

    //field for page
    const maxpage=Math.ceil(Object.keys(shownStudents).length/24);
    const[currentpage,setCurrentPage]=useState([1]);

    let items = [];
    const lastind=currentpage*24;
    const firstind=lastind-24;
    const pagedstudent=shownStudents.slice(firstind,lastind);
    let page=currentpage;
    
    const paginationBasic = (
        <div>
          <Pagination>{items}</Pagination>
          <br />
      
          <Pagination size="lg">{items}</Pagination>
          <br />
      
          <Pagination size="sm">{items}</Pagination>
        </div>
      );
    useEffect(() => {
        setCurrentPage(1);//reset to 1
    }, [nameSearch, majorSearch, interestSearch]);
    useEffect(() => {
        fetch("https://cs571.org/api/s24/hw4/students", {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setStudentData(data);
        })
    }, [])
    useEffect(() => {
        const filteredStudents = studentdata.filter(student => {
            let fullname=student.name.first+student.name.last;
            const processedname=fullname.toLowerCase();
            const searchName = nameSearch.toLowerCase().trim();
            const searchMajor = majorSearch.toLowerCase().trim();
            const searchInterest = interestSearch.toLowerCase().trim();
            //process the searchstuff
            return (
                processedname.includes(searchName) && student.major.toLowerCase().includes(searchMajor) && student.interests.some(interest => interest.toLowerCase().includes(searchInterest))
            );
            //get the result
        });
        setShownStudents(filteredStudents);
        //set the data
    }, [nameSearch, majorSearch, interestSearch, studentdata]); //rerun the effect when any of search changes

    function resetdata(){
        //called when onclick
        setNameSearch("");
        setMajorSearch("");
        setInterestSearch("");
        //reset
    }

    return <div>
        <h1>Badger Book</h1>
        <p>Search for students below!</p>
        <hr />
        <Form>
            <Form.Label htmlFor="searchName">Name</Form.Label>
            <Form.Control id="searchName" value= {nameSearch} onChange={(props)=>setNameSearch(props.target.value)}/>
            <Form.Label htmlFor="searchMajor">Major</Form.Label>
            <Form.Control id="searchMajor"value= {majorSearch} onChange={(props)=>setMajorSearch(props.target.value)}/>
            <Form.Label htmlFor="searchInterest">Interest</Form.Label>
            <Form.Control id="searchInterest"value= {interestSearch} onChange={(props)=>setInterestSearch(props.target.value)}/>
            <br />
            <Button variant="neutral" onClick={resetdata}>Reset Search</Button>
        </Form>
        <Container fluid>
            <row>
                {<p>There are {Object.keys(shownStudents).length} student(s) matching your search.</p> }
            </row>
            <Row>
            { 
                
                pagedstudent.map(student => {
                    return <Col key={student.id} xs={12} sm={12} md={6} lg={4} xl={3}>
                        <Student
                            name={student.name}
                            major={student.major}
                            numCredits={student.numCredits}
                            fromWisconsin={student.fromWisconsin}
                            interests={student.interests}
                        />
                    </Col>
                })
            }
            </Row>
            
            <Row>
                <Pagination>
                
                <Pagination.Prev onClick={() => setCurrentPage(prevPage => prevPage - 1)} disabled={currentpage === 1 || shownStudents.length === 0}>
                    Previous
                </Pagination.Prev>
                    {
                        Array.from({ length: maxpage }, (_, index) => (
                            
                            <Pagination.Item key={index+1} active={index+1===currentpage} onClick={() =>setCurrentPage(index+1)}>
                                {index+1}
                            </Pagination.Item>
                            
                            ))
                    }
                    <Pagination.Next onClick={() => setCurrentPage(prevPage => prevPage + 1)} disabled={currentpage === maxpage || shownStudents.length === 0}>
                        Next
                    </Pagination.Next>
                    </Pagination>
            </Row>

        </Container>
    </div>

}
//citation:
//the pagination next onclick part learned from online sources to prevent too many rerenders
export default Classroom;