import { Card, ScrollArea } from '@mantine/core'
import React from 'react'

const AdminReviews = () => {
  return (
    <Card className="flex flex-col flex-1 max-h-[40vh]" withBorder>
      <ScrollArea h={400}>
      <div className="heading w-full border-l-8 border-teal-300 my-4 ">
          <p className="w-full pl-6 text-xl tracking-wide">Most Flagged Reviews</p>
        </div>
      </ScrollArea>
    </Card>
  )
}

export default AdminReviews
