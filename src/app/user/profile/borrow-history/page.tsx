import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export default function History() {
    return (
        <div className="grid gap-6">
            <Card x-chunk="dashboard-04-chunk-1">
                Borrowing History
            </Card>
        </div>
    )
}