import { Image, Accordion, Grid, Container, Title } from "@mantine/core";
import image from "../../assets/faq.svg";
import classes from "./FAQ.module.css";

export const FAQ = () => {
  return (
    <div id='faq' className={classes.wrapper}>
      <Container size="lg" >
        <Grid id="faq-grid" gutter={50} justify="center" align="center">
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Image src={image} alt="Frequently Asked Questions" />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Title order={2} ta="left" className={classes.title}>
              Frequently Asked Questions
            </Title>

            <Accordion
              chevronPosition="right"
              defaultValue="reset-password"
              variant="separated"
            >
              <Accordion.Item className={classes.item} value="reset-password">
                <Accordion.Control>
                  How can I reset my password?
                </Accordion.Control>
                <Accordion.Panel>
                  Go to forget password section on your login page and enter you
                  email Id, you will recieve a link on your mail to reset your
                  password.
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item className={classes.item} value="another-account">
                <Accordion.Control>
                  Can I create more that one account?
                </Accordion.Control>
                <Accordion.Panel>You can create as many accounts as you have email.However, you can only create one listing with each account.</Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item className={classes.item} value="add-business">
                <Accordion.Control>
                  How can I add my business to the platform?
                </Accordion.Control>
                <Accordion.Panel>
                  To add your business, click on the "Add Business" button
                  located on the homepage. Fill in the required details about
                  your business and submit it for approval. Once approved, your
                  business will be listed on the platform.
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item
                className={classes.item}
                value="advertise-business"
              >
                <Accordion.Control>
                  How can I advertise my business?
                </Accordion.Control>
                <Accordion.Panel>
                  To advertise your business, go to the "Advertise" section
                  after logging in. Choose a package, customize your
                  advertisement, and submit it. Our team will review and approve
                  your advertisement.
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item className={classes.item} value="upload-file">
                <Accordion.Control>
                  Why can't I upload files for my business listing?
                </Accordion.Control>
                <Accordion.Panel>
                  If you're facing issues uploading files, please make sure the
                  file size is within the limit and the file type is supported.
                  If the problem persists, try using another browser or contact
                  support.
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item
                className={classes.item}
                value="category-selection"
              >
                <Accordion.Control>
                  How do I select a category for my business?
                </Accordion.Control>
                <Accordion.Panel>
                  During the business registration process, you will be prompted
                  to select a category. You can choose from categories like
                  grocery, food, electronics, fashion, books, and home. This
                  will help users find your business easily.
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  );
};
