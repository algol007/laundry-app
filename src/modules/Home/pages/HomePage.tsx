import {
  Flex,
  Box,
  Stack,
  Heading,
  Text,
  Card,
  CardHeader,
  CardBody,
  StackDivider,
  Select,
  useToast,
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
import { useCallback, useEffect, useState } from 'react';
import reportService, { ProductReportResult } from '@/services/reportService';

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

function HomePage() {
  const toast = useToast();
  const [reports, setReports] = useState<ProductReportResult[]>([]);

  const fetchProductReport = useCallback(() => {
    return reportService
      .getProductReport()
      .then((res) => {
        setReports(res);
      })
      .catch((err) => {
        toast({
          description: err.message,
          status: 'error',
        });
      });
  }, []);

  useEffect(() => {
    fetchProductReport();
  }, []);

  const data = {
    labels: reports.map((data) => data.created_at),
    datasets: [
      {
        data: reports.map((data) => data.total),
        backgroundColor: '#B2C5D4',
      },
    ],
  };

  return (
    <DefaultLayout>
      <Card mb={4}>
        <CardHeader>
          <Flex align={'center'} justify={'space-between'}>
            <Heading size='md'>Product Sold</Heading>
            <Box>
              <Select>
                <option value='option1'>This week</option>
              </Select>
            </Box>
          </Flex>
        </CardHeader>

        <CardBody>
          {/* @ts-ignore */}
          <Bar options={options} data={data} />
        </CardBody>
      </Card>

      <Box maxW='sm'>
        <Card>
          <CardHeader>
            <Flex align={'center'} justify={'space-between'}>
              <Heading size='md'>Top Selling Products</Heading>
              <Box>
                <Select>
                  <option value='option1'>This week</option>
                </Select>
              </Box>
            </Flex>
          </CardHeader>

          <CardBody>
            <Stack divider={<StackDivider />} spacing='4'>
              <Box>
                <Text pt='2' fontSize='sm'>
                  View a summary of all your clients over the last month.
                </Text>
              </Box>
              <Box>
                <Text pt='2' fontSize='sm'>
                  Check out the overview of your clients.
                </Text>
              </Box>
              <Box>
                <Text pt='2' fontSize='sm'>
                  See a detailed analysis of all your business clients.
                </Text>
              </Box>
            </Stack>
          </CardBody>
        </Card>
      </Box>
    </DefaultLayout>
  );
}

export default HomePage;
