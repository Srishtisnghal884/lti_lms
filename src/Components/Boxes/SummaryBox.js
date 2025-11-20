import React from 'react';
import CardsData from '../../Data/SummaryCards.json';
import { SummaryCard } from '../SummaryCard';
import { Grid, Card, CardContent, Skeleton, Box } from '@mui/material';
import { useGetAdminDashboardQuery } from '../../Features/Admin/adminApiSlice';

export const SummaryBox = () => {
  
  const skeletonArray = [1, 2, 3];
    const { data, isLoading, isError, error, isSuccess } =
useGetAdminDashboardQuery();

const dashboardStats = data?.data
  ? [
      {
        title: "No of Students",
        icon: "Groups",
        color: "#f15c2d",
        count: data?.data?.totalStudents
      },
      {
        title: "Total Asssessments",
        icon: "MenuBook",
        color: "#03a9f4",
        count: data?.data?.totalAssessments
      },
      {
        title: "Total Attempts",
        icon: "School",
        color: "#e91e63",
        count: data?.data?.totalAttempts
      }
    ]
  : [];

  let CardsInfo = dashboardStats;

  // Updating Progress
  const updatedCardsData = CardsInfo?.map((card) => {
    // const progressItem = data?.find((item) =>
    //   item.title.toLowerCase().includes(card.title.toLowerCase())
    // );

    // const progress = progressItem ? progressItem.progress : 0;

    return {
      ...card,
      // progress: progress,
    };
  });
console.log("updatedCardsData", updatedCardsData);

  return (
    <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      {/* {updatedCardsData.map((item) => (
        <Grid item xs={12} sm={6} lg={3} key={item.title}>
          <SummaryCard item={item} />
        </Grid>
      ))} */}
      {isLoading &&
        skeletonArray.map((i) => (
          <Grid item xs={12} sm={6} lg={3} key={i}>
            <Card sx={{ p: 2 }}>
              <CardContent>
                <Skeleton variant="circular" width={20} height={20} />
                <Skeleton variant="text" sx={{ mt: 2 }} width="70%" height={28} />
                <Skeleton variant="text" width="50%" height={14} />
              </CardContent>
            </Card>
          </Grid>
        ))}

      {/* Actual Loaded Cards */}
      {!isLoading &&
        updatedCardsData.map((item) => (
          <Grid item xs={12} sm={6} lg={3} key={item.title}>
            <SummaryCard item={item} />
          </Grid>
        ))}
    </Grid>
  );
};
