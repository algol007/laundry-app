import {
  Flex,
  Box,
  Heading,
  Card,
  CardHeader,
  CardBody,
  Select,
} from '@chakra-ui/react';
import { DefaultLayout } from '@/layouts';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: false,
    title: false,
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      data: labels.map(() => Math.floor(Math.random() * 100)),
      backgroundColor: '#B2C5D4',
    },
  ],
};

export default function SignupCard() {
  return (
    <DefaultLayout>
      <Card mb={4}>
        <CardHeader>
          <Flex align={'center'} justify={'space-between'}>
            <Heading size='md'>Product Sold</Heading>
            <Box>
              <Select>
                <option value='option1'>This week</option>
                <option value='option2'>This month</option>
              </Select>
            </Box>
          </Flex>
        </CardHeader>

        <CardBody>
          {/* @ts-ignore */}
          <Bar options={options} data={data} />
        </CardBody>
      </Card>
    </DefaultLayout>
  );
}
