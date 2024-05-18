import React, { useContext } from "react";
import {
  Box,
  Text,
  Heading,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import "./theme3.css";
import ResumeContext from "../../Context/ResumeContext";

const Theme3 = (props) => {
  const { componentRef } = props;
  const { checkProj, checkWork, checkAward, themeData } = useContext(ResumeContext);
  const { name, address, phone, email, profile, summary, skill } =
    themeData.personalData;

  const { projectTitles, projectDesc } = themeData.projectData;
  const { educationTitles, educationDesc } = themeData.educationData;
  const { workTitles, workDesc } = themeData.workData;
  const { awards } = themeData.awardData;

  return (
    <Box id="section-to-print" ref={componentRef}>
      <Box id="theme3" paddingBlock={10} paddingInline={20}>
        <header
          id="info"
          className="text-center d-flex justify-content-between align-items-center"
        >
          <Box className="info-text text-start">
            <Heading
              as="h2"
              size="2xl"
              color="red.800"
              className="mb-2"
              fontFamily="serif"
            >
              {name}
            </Heading>
            <Text
              fontWeight="600"
              fontSize="md"
              className="mt-1 mb-2"
              fontFamily="serif"
            >
              {profile}
            </Text>
            <Box>
              <Box className="mt-3">
                <Text width={"190px"} fontFamily="serif" fontSize={"sm"}>
                  {address}
                </Text>
                <Text fontSize={"sm"} fontFamily="serif">
                  {phone}
                </Text>
                <Text fontSize={"sm"} fontFamily="serif">
                  {email}
                </Text>
              </Box>
            </Box>
          </Box>
        </header>
        <div className="w-100 border m-auto"></div>
        <section className="bottom-part d-flex mt-3">
          <section className="sections">
            <Box display={"flex"} className="w-full my-4">
              <Heading as="h3" size="md" minWidth={175} fontFamily="serif">
                Summary
              </Heading>
              <Box marginLeft={25}>
                <Text fontSize="sm" className="summary-text">
                  {summary}
                </Text>
              </Box>
            </Box>
            {!checkWork && (
              <>
                <div className="w-100 border m-auto"></div>

                <Box display={"flex"} className="w-full my-4">
                  <Heading as="h3" size="md" minWidth={175} fontFamily="serif">
                    Experience
                  </Heading>
                  <Box marginLeft={25} width="100%">
                    {Object.entries(workTitles).map((element, index) => (
                      <Box key={index} className="mt-1">
                        <Heading fontSize="md" fontFamily='serif' className="my-2">
                          {element[1]}
                        </Heading>
                        {Object.entries(workDesc)[index]?.[1]
                          .split(",")
                          .map((desc, idx) => (
                            <Text key={idx} fontSize="sm">{desc}</Text>
                          ))}
                      </Box>
                    ))}
                  </Box>
                </Box>
              </>
            )}

            <div className="w-100 border m-auto"></div>

            <Box display={"flex"} className="w-full my-4">
              <Heading as="h3" size="md" minWidth={175} fontFamily="serif">
                Education
              </Heading>
              <Box marginLeft={25} width="100%">
                {Object.entries(educationTitles).map((element, index) => (
                  <Box key={index} className="mb-4">
                    <Heading fontSize="md" fontFamily='serif' className="mb-2">
                      {element[1]}
                    </Heading>
                    {Object.entries(educationDesc)[index]?.[1]
                      .split(",")
                      .map((desc, idx) => (
                        <Text key={idx} fontSize="sm">{desc}</Text>
                      ))}
                  </Box>
                ))}
              </Box>
            </Box>

            {!checkProj && (
              <>
                <div className="w-100 border m-auto"></div>
                <Box display={"flex"} className="w-full my-4">
                  <Heading as="h3" size="md" minWidth={175} fontFamily="serif">
                    Projects
                  </Heading>
                  <Box marginLeft={25} width="100%">
                    {Object.entries(projectTitles).map((element, index) => (
                      <Box key={index} className="mt-1">
                        <Heading fontSize="md" fontFamily='serif' className="my-2">
                          {element[1]}
                        </Heading>
                        <Box className="sub-details">
                          {Object.entries(projectDesc)[index]?.[1]
                            .split(",")
                            .map((desc, idx) => (
                              <Text key={idx} fontSize="sm">{desc}</Text>
                            ))}
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </>
            )}

            <div className="w-100 border m-auto"></div>

            <Box display={"flex"} className="w-full my-4">
              <Heading as="h3" size="md" minWidth={175} fontFamily="serif">
                Skills
              </Heading>
              <Box marginLeft={25} width="100%">
                <Grid templateColumns="repeat(2, 1fr)" gap={5}>
                  {skill.split(",").map((item, index) => (
                    <GridItem key={index}>
                      <Box display="flex" alignItems="center">
                        <Box
                          bg="black"
                          width="6px"
                          height="6px"
                          borderRadius="full"
                        />
                        <Text className="mx-1" color="gray" fontFamily="serif" fontSize="sm">
                          {item}
                        </Text>
                      </Box>
                    </GridItem>
                  ))}
                </Grid>
              </Box>
            </Box>
            {!checkAward && (
              <>
                <div className="w-100 border m-auto"></div>

                <Box display={"flex"} className="w-full my-4">
                  <Heading as="h3" size="md" minWidth={175} fontFamily="serif">
                    Achievement
                  </Heading>
                  <Box marginLeft={25} width="100%">
                    <Grid templateColumns="repeat(2, 1fr)" gap={5}>
                      {awards.split(",").map((item, index) => (
                        <GridItem key={index}>
                          <Box display="flex" alignItems="center">
                            <Box
                              bg="black"
                              width="6px"
                              height="6px"
                              borderRadius="full"
                            />
                            <Text className="mx-1" color="gray" fontFamily='serif' fontSize="sm">
                              {item}
                            </Text>
                          </Box>
                        </GridItem>
                      ))}
                    </Grid>
                  </Box>
                </Box>
              </>
            )}
          </section>
        </section>
      </Box>
    </Box>
  );
};

export default Theme3;
