import { Box } from '@mui/material';
import DrawerHeader from "@/components/DrawerHeader";
import Dashboard from "@/components/Dashboard";

export default function Home() {
  return (
    <>
      <Box component="main" sx={ { flexGrow: 1, py: 4, pl: 4 } } className='bg-[#F0F2F5] h-[100vh] '   >
        <DrawerHeader />
        <Box>
          <Dashboard />
        </Box>
      </Box>
    </>
  );
}
