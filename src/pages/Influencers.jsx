import React, { useState, memo, useMemo } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Instagram, Facebook, Search } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import SEO from "../components/SEO";
import { seoData } from "../utils/seoData";

// TikTok icon used in social links
const TikTokIcon = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

// Build a dynamic catalog of influencer images grouped by category (folder name)
const useInfluencerCatalog = () => {
  return useMemo(() => {
    const modules = {
      // Only JPG files
      ...import.meta.glob("../assets/Influencers/**/*.jpg", {
        eager: true,
        import: "default",
      }),
      ...import.meta.glob("../assets/Influencers/**/*.JPG", {
        eager: true,
        import: "default",
      }),
      // Include non-standard suffixed JPG files like .jpgcc, .jpgDD
      ...import.meta.glob("../assets/Influencers/**/*.jpg*", {
        eager: true,
        import: "default",
      }),
      ...import.meta.glob("../assets/Influencers/**/*.JPG*", {
        eager: true,
        import: "default",
      }),
    };

    const items = [];
    const categoryLabelByKey = new Map();

    Object.entries(modules).forEach(([path, url], index) => {
      const marker = "/assets/Influencers/";
      const after = path.split(marker)[1] || "";
      const segments = after.split("/");
      const categoryLabel = segments[0] || "Uncategorized";
      const categoryKey = categoryLabel.toLowerCase();
      const filename =
        segments.slice(1).join("/") ||
        path.split("/").pop() ||
        `image-${index}`;
      const name = filename.replace(/\.[^.]+$/, "");

      if (!categoryLabelByKey.has(categoryKey)) {
        categoryLabelByKey.set(categoryKey, categoryLabel);
      }

      items.push({
        id: `${categoryKey}-${index}`,
        name,
        category: categoryKey,
        type: categoryLabel,
        photo: url,
        socialLinks: [],
      });
    });

    const filters = [{ key: "all", label: "All" }].concat(
      Array.from(categoryLabelByKey.entries()).map(([key, label]) => ({
        key,
        label,
      }))
    );

    return { items, filters };
  }, []);
};

const InfluencersContainer = styled.section`
  padding: 0;
  background: #000000;
  position: relative;
  overflow: hidden;
`;

const ContentSection = styled.section`
  padding: 8rem 0 5rem;
  background: #000000;
  position: relative;
  overflow: hidden;
  margin-top: 0;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
        circle at 80% 40%,
        rgba(238, 47, 47, 0.05) 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 40% 50%,
        rgba(238, 47, 47, 0.03) 0%,
        transparent 50%
      );
    z-index: 1;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 2;
`;

const HeroSection = styled(motion.div)`
  text-align: center;
  margin-bottom: 5rem;
`;

const HeroTitle = styled.h1`
  font-family: "Space Grotesk", sans-serif;
  font-size: 4rem;
  font-weight: 700;
  background: linear-gradient(135deg, #ffffff 0%, #ee2f2f 50%, #ffffff 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 2rem;
  letter-spacing: -0.02em;
  position: relative;
  text-align: center;

  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background: linear-gradient(90deg, #ee2f2f, #c41e1e);
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  color: #ffffff;
  opacity: 0.8;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
  font-weight: 400;
`;

const FilterTabs = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
`;

const SearchBarWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 0 1.5rem 0;
  padding: 0 2rem;
`;

const SearchInput = styled.input`
  width: 100%;
  max-width: 1024px;
  min-width: 420px;
  padding: 0.75rem 1rem;
  border-radius: 999px;
  background: rgb(0, 0, 0);
  border: 1px solid #333333;
  color: #ffffff;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &::placeholder {
    color: #888888;
  }

  &:focus {
    border-color: #ee2f2f;
    box-shadow: 0 0 0 3px rgba(238, 47, 47, 0.15);
  }
`;

const FilterTab = styled.button`
  padding: 0.75rem 1.5rem;
  border: 2px solid #333333;
  background: ${(props) => (props.$active ? "#ee2f2f" : "transparent")};
  color: ${(props) => (props.$active ? "#ffffff" : "#ffffff")};
  border-radius: 2rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #ee2f2f;
    color: #ffffff;
    background: #ee2f2f;
  }

  &.active {
    border-color: #ee2f2f;
  }
`;

const SwiperContainer = styled.div`
  width: 100%;
  padding: 2rem 0;
  -webkit-overflow-scrolling: touch;
  overflow: hidden;

  .swiper {
    width: 100%;
    height: 100%;
    padding: 2rem 0;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: stretch;
    width: 100%;
    height: auto;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  @media (max-width: 768px) {
    padding: 1rem 0;

    .swiper {
      padding: 1rem 0;
      width: 100%;
    }

    .swiper-slide {
      width: 100%;
      max-width: 100%;
    }
  }

  .swiper-button-next,
  .swiper-button-prev {
    color: #ee2f2f;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    width: 30px;
    height: 30px;
    margin-top: -18px;
    box-sizing: content-box;
    padding: 8px;

    &:after {
      font-size: 12px;
    }
  }

  .swiper-button-next {
    right: 12px;
  }
  .swiper-button-prev {
    left: 12px;
  }

  .swiper-pagination {
    margin-top: 2rem;
    position: relative;
  }

  .swiper-pagination-bullet {
    background: #ee2f2f;
    opacity: 0.5;

    &.swiper-pagination-bullet-active {
      opacity: 1;
    }
  }
`;

const InfluencerCard = styled(motion.div)`
  background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid #333333;
  transition: all 0.3s ease;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 450px;
  margin: 0 auto;
  cursor: default;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(238, 47, 47, 0.2);
    border-color: #ee2f2f;
  }

  @media (max-width: 768px) {
    max-width: 100%;
    width: 100%;
  }
`;

const InfluencerImage = styled.div`
  height: 350px;
  background: linear-gradient(135deg, #ee2f2f 0%, #c41e1e 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 4rem;
  font-weight: 600;
  position: relative;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(238, 47, 47, 0.3);
  width: 100%;
  margin: 0;
  padding: 0;

  @media (max-width: 768px) {
    height: 418px;
    overflow: hidden;
  }

  @media (max-width: 480px) {
    height: 550px;
    overflow: hidden;
  }
`;

const InfluencerPhoto = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  margin: 0;
  padding: 0;
  display: block;
  min-width: 100%;
  min-height: 100%;
  transition: opacity 0.3s ease;
  opacity: 0;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;

  &[src] {
    opacity: 1;
  }

  @media (max-width: 768px) {
    object-fit: cover;
    object-position: center;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
`;

const InfluencerContent = styled.div`
  padding: 3rem;

  @media (max-width: 768px) {
    padding: 2.5rem;
  }

  @media (max-width: 480px) {
    padding: 2rem;
  }
`;

const InfluencerName = styled.h3`
  font-family: "Space Grotesk", sans-serif;
  font-size: 1.25rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 1rem;
  letter-spacing: -0.01em;
  text-transform: uppercase;
`;

const InfluencerCategory = styled.p`
  color: #ee2f2f;
  font-weight: 500;
  margin-bottom: 1.5rem;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  opacity: 0.9;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const SocialLink = styled.a`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #333333;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 1px solid #555555;

  &:hover {
    background: #ee2f2f;
    color: #ffffff;
    transform: scale(1.1);
    border-color: #ee2f2f;
  }
`;

const Influencers = memo(() => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Detect mobile with error handling
  React.useEffect(() => {
    try {
      const isMobileDevice =
        window.innerWidth <= 768 ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );

      setIsMobile(isMobileDevice);

      // Mobile-specific optimizations
      if (isMobileDevice) {
        // Disable problematic mobile behaviors
        document.body.style.touchAction = "manipulation";
        document.body.style.webkitTouchCallout = "none";
        document.body.style.webkitUserSelect = "none";
        document.body.style.userSelect = "none";

        // Prevent zoom and other touch issues
        const preventDefault = (e) => {
          if (e.touches.length > 1) {
            e.preventDefault();
          }
        };

        document.addEventListener("touchstart", preventDefault, {
          passive: false,
        });
        document.addEventListener("touchmove", preventDefault, {
          passive: false,
        });

        return () => {
          document.removeEventListener("touchstart", preventDefault);
          document.removeEventListener("touchmove", preventDefault);
        };
      }
    } catch (error) {
      console.error("Mobile detection error:", error);
      // Fallback to mobile if detection fails
      setIsMobile(true);
    }
  }, []);
  const { items, filters } = useInfluencerCatalog();

  const filteredInfluencers = useMemo(() => {
    const byCategory =
      activeFilter === "all"
        ? items
        : items.filter((item) => item.category === activeFilter);
    const q = searchQuery.trim().toLowerCase();
    if (!q) return byCategory;
    return byCategory.filter((item) => {
      const name = (item.name || "").toLowerCase();
      const type = (item.type || "").toLowerCase();
      return name.includes(q) || type.includes(q);
    });
  }, [activeFilter, items, searchQuery]);

  const getSocialIcon = (platform) => {
    switch (platform) {
      case "instagram":
        return <Instagram size={16} />;
      case "facebook":
        return <Facebook size={16} />;
      case "tiktok":
        return <TikTokIcon size={16} />;
      default:
        return null;
    }
  };

  const formatFilterLabel = (label) => {
    if (!label) return label;
    return label
      .toString()
      .split(" ")
      .map((word) =>
        word.length ? word[0].toUpperCase() + word.slice(1) : word
      )
      .join(" ");
  };

  const slugifyName = (name) => {
    if (!name) return "";
    return name
      .toString()
      .trim()
      .toLowerCase()
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s_-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 10,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      <SEO {...seoData.influencers} />
      <InfluencersContainer>
        <ContentSection id="content">
          <Container ref={ref}>
            <HeroSection
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
            >
              <HeroTitle>LA Marketing Influencer Network</HeroTitle>
              <HeroSubtitle>
                We're proud to work with amazing brands, influencers, and
                startups across the Middle East.
              </HeroSubtitle>
            </HeroSection>

            <FilterTabs>
              {filters.map((filter) => (
                <FilterTab
                  key={filter.key}
                  $active={activeFilter === filter.key}
                  className={activeFilter === filter.key ? "active" : ""}
                  onClick={() => setActiveFilter(filter.key)}
                >
                  {formatFilterLabel(filter.label)}
                </FilterTab>
              ))}
            </FilterTabs>

            <SearchBarWrapper>
              <SearchInput
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search influencers..."
                aria-label="Search influencers"
              />
            </SearchBarWrapper>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFilter}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  {filteredInfluencers.length === 0 ? (
                    <div
                      style={{
                        textAlign: "center",
                        color: "#bbb",
                        padding: "2rem 1rem",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <Search size={18} color="#888" />
                      <span>No influencers found</span>
                    </div>
                  ) : isMobile ? (
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns:
                          "repeat(auto-fit, minmax(300px, 1fr))",
                        gap: "2rem",
                        padding: "2rem 0",
                      }}
                    >
                      {filteredInfluencers.map((client) => (
                        <InfluencerCard
                          key={client.id}
                          variants={itemVariants}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                          }}
                        >
                          <InfluencerImage>
                            {client.photo ? (
                              <InfluencerPhoto
                                src={client.photo}
                                alt={client.name}
                                loading="lazy"
                                decoding="async"
                                onLoad={(e) => {
                                  e.target.style.opacity = "1";
                                }}
                                onError={(e) => {
                                  e.target.style.display = "none";
                                }}
                              />
                            ) : (
                              client.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                            )}
                          </InfluencerImage>
                          <InfluencerContent>
                            <InfluencerName>{client.name}</InfluencerName>
                            <InfluencerCategory>
                              {client.type}
                            </InfluencerCategory>

                            <SocialLinks>
                              {(() => {
                                const slug = slugifyName(client.name);
                                const igUrl = slug
                                  ? `https://www.instagram.com/${slug}`
                                  : "#";
                                const ttUrl = slug
                                  ? `https://www.tiktok.com/@${slug}`
                                  : "#";
                                return (
                                  <>
                                    <SocialLink
                                      target="_blank"
                                      href={igUrl}
                                      aria-label="Instagram"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        if (igUrl !== "#") {
                                          window.open(
                                            igUrl,
                                            "_blank",
                                            "noopener,noreferrer"
                                          );
                                        }
                                      }}
                                    >
                                      <Instagram size={16} />
                                    </SocialLink>
                                    <SocialLink
                                      target="_blank"
                                      href={ttUrl}
                                      aria-label="TikTok"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        if (ttUrl !== "#") {
                                          window.open(
                                            ttUrl,
                                            "_blank",
                                            "noopener,noreferrer"
                                          );
                                        }
                                      }}
                                    >
                                      <TikTokIcon size={16} />
                                    </SocialLink>
                                  </>
                                );
                              })()}
                            </SocialLinks>
                          </InfluencerContent>
                        </InfluencerCard>
                      ))}
                    </div>
                  ) : (
                    <SwiperContainer>
                      <Swiper
                        modules={[Navigation]}
                        spaceBetween={20}
                        slidesPerView={1}
                        navigation={true}
                        pagination={false}
                        autoplay={false}
                        loop={false}
                        breakpoints={{
                          768: {
                            slidesPerView: 2,
                            spaceBetween: 30,
                          },
                          1024: {
                            slidesPerView: 3,
                            spaceBetween: 40,
                          },
                        }}
                      >
                        {filteredInfluencers.map((client) => (
                          <SwiperSlide key={client.id}>
                            <InfluencerCard
                              variants={itemVariants}
                              whileHover={{ scale: 1.02 }}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                              }}
                            >
                              <InfluencerImage>
                                {client.photo ? (
                                  <InfluencerPhoto
                                    src={client.photo}
                                    alt={client.name}
                                    loading="lazy"
                                    decoding="async"
                                    onLoad={(e) => {
                                      e.target.style.opacity = "1";
                                    }}
                                    onError={(e) => {
                                      e.target.style.display = "none";
                                    }}
                                  />
                                ) : (
                                  client.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")
                                )}
                              </InfluencerImage>
                              <InfluencerContent>
                                <InfluencerName>{client.name}</InfluencerName>
                                <InfluencerCategory>
                                  {client.type}
                                </InfluencerCategory>
                                <SocialLinks>
                                  {(() => {
                                    const slug = slugifyName(client.name);
                                    const igUrl = slug
                                      ? `https://www.instagram.com/${slug}`
                                      : "#";
                                    const ttUrl = slug
                                      ? `https://www.tiktok.com/@${slug}`
                                      : "#";
                                    return (
                                      <>
                                        <SocialLink
                                          target="_blank"
                                          href={igUrl}
                                          aria-label="Instagram"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            if (igUrl !== "#") {
                                              window.open(
                                                igUrl,
                                                "_blank",
                                                "noopener,noreferrer"
                                              );
                                            }
                                          }}
                                        >
                                          <Instagram size={16} />
                                        </SocialLink>
                                        <SocialLink
                                          target="_blank"
                                          href={ttUrl}
                                          aria-label="TikTok"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            if (ttUrl !== "#") {
                                              window.open(
                                                ttUrl,
                                                "_blank",
                                                "noopener,noreferrer"
                                              );
                                            }
                                          }}
                                        >
                                          <TikTokIcon size={16} />
                                        </SocialLink>
                                      </>
                                    );
                                  })()}
                                </SocialLinks>
                              </InfluencerContent>
                            </InfluencerCard>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </SwiperContainer>
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </Container>
        </ContentSection>
      </InfluencersContainer>
    </>
  );
});

export default Influencers;
