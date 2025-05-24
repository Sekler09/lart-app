'use client';

import React from 'react';
import { useGetUsers } from '@/services/users';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

export default function UsersTablePage() {
  const { data: users, isLoading, isError, error } = useGetUsers();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Users List</h1>
      {!isError && (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="w-[180px]">Joined At</TableHead>
                <TableHead className="w-[180px]">Last Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading && (
                <>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Skeleton className="h-4 w-[50px]" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-[200px]" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-[120px]" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-[120px]" />
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              )}
              {users?.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.id}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {new Date(user.createdAt).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </TableCell>
                  <TableCell>
                    {new Date(user.updatedAt).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      {users?.length === 0 && (
        <p className="text-center py-4">No users found.</p>
      )}
      {isError && (
        <Alert variant="destructive" className="mt-6">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error Fetching Users</AlertTitle>
          <AlertDescription>
            {error?.response?.data?.message ||
              error?.message ||
              'An unknown error occurred.'}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
