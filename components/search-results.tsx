"use client"

import type React from "react"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Bookmark, User } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

interface SearchResult {
  id: string
  ownerId?: string
  ownerName: string
  propertyName: string
  address: string
  price: number
}

interface SearchResultsProps {
  results: SearchResult[]
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  const [bookmarked, setBookmarked] = useState<string[]>([])

  const toggleBookmark = (id: string) => {
    if (bookmarked.includes(id)) {
      setBookmarked(bookmarked.filter((bookmarkId) => bookmarkId !== id))
    } else {
      setBookmarked([...bookmarked, id])
    }
  }

  return (
    <Table>
      <TableCaption>Search Results</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Owner</TableHead>
          <TableHead>Property</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>Price</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {results.map((result) => (
          <TableRow key={result.id}>
            <TableCell>
              <Link href={`/owners/${result.ownerId || result.id}`} className="hover:text-blue-600 transition-colors">
                <span className="font-medium cursor-pointer">{result.ownerName}</span>
              </Link>
            </TableCell>
            <TableCell>{result.propertyName}</TableCell>
            <TableCell>{result.address}</TableCell>
            <TableCell>${result.price}</TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" size="sm" onClick={() => toggleBookmark(result.id)}>
                <Bookmark className={`h-4 w-4 ${bookmarked.includes(result.id) ? "fill-current" : ""}`} />
              </Button>
              <Link href={`/owners/${result.ownerId || result.id}`}>
                <Button variant="outline" size="sm">
                  <User className="h-4 w-4 mr-1" />
                  Owner Profile
                </Button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={5}>{results.length} result(s) found.</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}

export default SearchResults
