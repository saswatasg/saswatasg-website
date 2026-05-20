import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, ExternalLink } from 'lucide-react';

const FeaturedCard = ({ custom }) => {
  const handleAnalytics = (eventName) => {
    console.log(`Analytics Event: ${eventName}`);
  };

  return (
    <Card custom={custom}>
      <CardHeader>
        <CardTitle>Featured</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Button asChild variant="outline" className="justify-start gap-3 text-base p-6" onClick={() => handleAnalytics('contact_resume_clicked')}>
          <a href="https://drive.google.com/file/d/1cRaGUx3cvEYShMD67zLQIK4UxdPi6p-o/view?usp=sharing" target="_blank" rel="noopener noreferrer">
            <FileText className="h-5 w-5 text-primary" />
            <span className="flex-1 text-left">My resume</span>
            <ExternalLink className="h-4 w-4 text-muted-foreground" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
};

export default FeaturedCard;
