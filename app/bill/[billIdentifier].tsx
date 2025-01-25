import React from "react";
import { View, Text } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { Stack, useLocalSearchParams, Link } from "expo-router";

const BillSummaryScreen = () => {
  const { billIdentifier } = useLocalSearchParams();

  const query = useQuery({
    queryKey: [`bill/${billIdentifier}`],
    queryFn: async () => {
      const response = await fetch(`/api/bill/${billIdentifier}`, {
        method: "GET",
      });
      return await response.json();
    },
  });

  const bill = query.data || undefined;

  return (
    <View className="flex-1 p-4">
      <Stack.Screen
        options={{ title: bill ? `${bill.type}-${bill.number}` : "..." }}
      />
      {bill ? (
        <>
          <Text className="text-xl font-bold mb-4">{bill.title}</Text>
          {bill.latestAction && (
            <>
              <Text className="font-bold">Latest action</Text>
              <Text className="text-lg mb-2">
                {bill.latestAction.actionDate}: {bill.latestAction.text}
              </Text>
            </>
          )}
          {bill.sponsors && (
            <>
              <Text className="font-bold">Sponsors</Text>
              {bill.sponsors.map((sponsor: any) => (
                <Link
                  key={sponsor.bioguideId}
                  href={`/member/${sponsor.bioguideId}`}
                >
                  <Text className="text-lg mb-2 color-blue-700">
                    {sponsor.fullName}
                  </Text>
                </Link>
              ))}
            </>
          )}
        </>
      ) : (
        <Text className="text-lg">...</Text>
      )}
    </View>
  );
};

export default BillSummaryScreen;
