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
import { faker } from '@faker-js/faker';

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

function SalesPage() {
  const topSelling: number[] = [1, 2, 3];

  return (
    <DefaultLayout>
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
              {topSelling.map((data) => (
                <Flex justify='space-between' key={data}>
                  <Text pt='2' fontSize='sm'>
                    {faker.commerce.product()}
                  </Text>
                  <Text pt='2' fontSize='sm' fontWeight='bold'>
                    {faker.number.int(100)}
                  </Text>
                </Flex>
              ))}
            </Stack>
          </CardBody>
        </Card>
      </Box>
    </DefaultLayout>
  );
}

export default SalesPage;
