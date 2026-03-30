import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqItems = [
    {
        question: "How do I enroll in a course?",
        answer: "To enroll, navigate to the course you're interested in and click the 'Enroll' button. If it's a paid course, you will be prompted for payment. For free courses, you'll be enrolled immediately."
    },
    {
        question: "How do I reset my password?",
        answer: "On the login page, click the 'Forgot your password?' link. You'll be asked to enter your email address, and a password reset link will be sent to your inbox."
    },
    {
        question: "Are the certificates official?",
        answer: "Our certificates represent successful completion of our rigorous courses and are a valuable addition to your professional profile. Each certificate is verifiable on our platform via a unique link or QR code."
    },
    {
        question: "How is my course progress tracked?",
        answer: "Your progress is tracked automatically as you complete lessons and modules. A course is marked as complete once all modules and assessments are finished, allowing you to claim your certificate."
    },
    {
        question: "Can I get a refund for a course?",
        answer: "As stated in our Terms of Use, all course fees are non-refundable unless required by Nigerian law. We encourage you to explore our free courses to get a feel for our platform before purchasing."
    },
];

export default function HelpCenterPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <Card className="w-full max-w-4xl mx-auto bg-card/60 backdrop-blur-sm border-border/50">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-headline">Help Center</CardTitle>
          <CardDescription>
            Find answers to frequently asked questions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-semibold">{item.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
