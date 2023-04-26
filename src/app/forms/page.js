'use client';

import { Card } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { FaPencilAlt } from 'react-icons/fa';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import Button from 'react-bootstrap/Button';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import axios from 'axios';
import createClient from 'src/lib/supabase-browser';

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
// export const getServerSideProps = async (ctx) => {
//   console.log('niceee');
//   const supabase = createClient();
//   const { uid } = await supabase.auth.api.getUserByCookie(ctx.req);
//   console.log(uid, 'server side props');
//   const { data, error } = await axios.get(`/api/forms?uid=${uid}`);

//   if (data) {
//     return {
//       props: {
//         data,
//       },
//     };
//   } else {
//     return {
//       redirect: {
//         destination: '/profile',
//         permanent: false,
//       },
//     };
//   }
// };

const Forms = ({ data }) => {
  const formsData = [
    {
      id: 1,
      title: 'A trail survey',
      createdOn: '12/04/2023',
    },
    {
      id: 2,
      title: 'semester feedback',
      createdOn: '07/11/2023',
    },
  ];

  // useEffect(() => {}, [third]);

  // console.log(data);

  return (
    <section className="container-fluid d-flex flex-column justify-content-start">
      <Card style={{ width: '20rem', height: '10rem' }} className="bg-success ">
        <Card.Body className="mt-4 text-center text-white">
          <Card.Title>+ CREATE</Card.Title>
          <Card.Text>Click here to create your new form</Card.Text>
        </Card.Body>
      </Card>
      <div className="mt-4">
        <h2>Recent Forms</h2>
        <Table hover>
          <thead>
            <tr>
              <th>#</th>
              <th>TITLE</th>
              <th className="text-end">CREATED ON</th>
              <th className="text-end">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {formsData.map((form, i) => (
              <tr key={i}>
                <td>{form.id}</td>
                <td>{form.title}</td>
                <td className="text-muted text-end">{form.createdOn}</td>
                <td className="text-end">
                  <OverlayTrigger placement="bottom" overlay={<Tooltip>Edit</Tooltip>}>
                    <Button
                      variant="light"
                      size="sm"
                      className="rounded-circle text-warning mx-2 shadow-sm"
                    >
                      <FaPencilAlt />
                    </Button>
                  </OverlayTrigger>
                  <OverlayTrigger placement="bottom" overlay={<Tooltip>Delete</Tooltip>}>
                    <Button
                      variant="light"
                      size="sm"
                      className="rounded-circle text-danger mx-2 shadow-sm"
                    >
                      <MdOutlineDeleteOutline />
                    </Button>
                  </OverlayTrigger>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </section>
  );
};

export default Forms;
