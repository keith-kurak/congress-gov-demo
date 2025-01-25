import { useState } from "react";
import { Text, View, Pressable, ActivityIndicator } from "react-native";
import { Stack, Link } from "expo-router";
import { useInfiniteQuery, keepPreviousData } from "@tanstack/react-query";
import { ScrollView } from "react-native-gesture-handler";
import classNames from "classnames";
import { flatten } from "lodash";

export default function Index() {
  const query = useInfiniteQuery({
    queryKey: [`bills`],
    queryFn: async ({ pageParam }) => {
      const response = await fetch(`/api/bills?page=${pageParam}`, {
        method: "GET",
      });
      return await response.json();
    },
    placeholderData: keepPreviousData,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => { return pages.length + 1 },
  });

  return (
    <ScrollView
      style={{
        flex: 1,
      }}
    >
      <Stack.Screen
        options={{
          title: "WTF is Congress Doing?",
        }}
      />
      {query.data &&
        flatten(query.data.pages).map((bill: any) => (
          <Link
            asChild
            key={`${bill.congress}-${bill.type}-${bill.number}`}
            href={`/bill/${bill.congress}-${bill.type}-${bill.number}`}
          >
            <Pressable>
              <View className="p-2 gap-y-0.5">
                <Text className="text-lg font-bold">{bill.type}-{bill.number}</Text>
                <Text className="text-xs italic">{bill.updateDate}</Text>
                <Text>
                  {bill.title}
                </Text>
              </View>
              <View className="border-b-2 border-gray-300 mx-2" />
            </Pressable>
          </Link>
        ))}
      {query.isFetching ? (
        <ActivityIndicator className="p-4" size="small" />
      ) : (
        <Pressable onPress={query.fetchNextPage}>
          <View className="p-4 items-center justify-center">
            <Text
              className={classNames("text-blue-500", {
                "text-gray-500": query.isFetching,
              })}
            >
              Load More
            </Text>
          </View>
        </Pressable>
      )}
    </ScrollView>
  );
}
